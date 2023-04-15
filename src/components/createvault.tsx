import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import useProfileChainInfo from "~/hooks/useProfileChainInfo";
import { useSignup } from "~/hooks/useSignup";

const userFields = [
  { key: "name", placeholder: "Name", required: true },
  { key: "handle", placeholder: "Handle", required: true },
  { key: "ens", placeholder: "ENS" },
  { key: "title", placeholder: "Title" },
  { key: "bio", placeholder: "Bio" },
  { key: "currentLocation", placeholder: "Current Location" },
  { key: "futureLocation", placeholder: "Future Location" },
  { key: "avatar", placeholder: "Avatar" },
];

const mockBlockchainData = [
  {
    chainId: "1",
    token: { name: "Allstarz PSX", symbol: "PSX" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b4",
    tokenId: "302",
    tokenType: "ERC721",
  },
  {
    chainId: "1",
    token: { name: "FWB", symbol: "FWB" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC20",
  },
  {
    chainId: "1",
    token: { name: "Nouns DAO", symbol: "Nouns" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC721",
    thumbnail:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTFkN2Q1IiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyMTAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjIyMCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjMwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyNDAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjUwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMjUwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjI2MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjI2MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyNzAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIyNzAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjgwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMjgwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjI5MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjI5MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIzMDAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIzMDAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMzEwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMzEwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSIyMzAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjI0MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE0MCIgeT0iMjUwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIyNTAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjI2MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMjYwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTYwIiB5PSIyNzAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjI4MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMjgwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSIyOTAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNzAiIHk9IjI5MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE5MCIgeT0iMjkwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIzMDAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxOTAiIHk9IjMwMCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMzAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjQwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSI1MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSI2MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjgwIiB5PSI2MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSI2MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iNjAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjYwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSI2MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE1MCIgeT0iNjAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNzAiIHk9IjYwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSI2MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIwMCIgeT0iNjAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjYwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSI2MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI0MCIgeT0iNjAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjcwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSI4MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSI5MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iOTAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjkwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNTAiIHk9IjEwMCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iMTAwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNTAiIHk9IjExMCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iMTEwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjYwIiB5PSIxMTAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTIwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxMjAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyNjAiIHk9IjEyMCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMzAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI1MCIgeT0iMTMwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxMzAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIyNTAiIHk9IjEzMCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxNDAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE0MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjI1MCIgeT0iMTQwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjcwIiB5PSIxNDAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTUwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iNTAiIHk9IjE1MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iMTUwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIxMCIgeD0iMjUwIiB5PSIxNTAiIGZpbGw9IiM2MjYxNmQiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTYwIiBmaWxsPSIjNjI2MTZkIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxNjAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNTAiIHk9IjE2MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI3MCIgeT0iMTYwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE3MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjgwIiB5PSIxNzAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMTcwIiBmaWxsPSIjZDdkM2NkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTEwIiB5PSIxNzAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjE3MCIgZmlsbD0iI2Q3ZDNjZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE0MCIgeT0iMTcwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTUwIiB5PSIxNzAiIGZpbGw9IiNkN2QzY2QiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNzAiIHk9IjE3MCIgZmlsbD0iIzFmMWQyOSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMTcwIiBmaWxsPSIjZDdkM2NkIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjAwIiB5PSIxNzAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjE3MCIgZmlsbD0iI2Q3ZDNjZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIzMCIgeT0iMTcwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSIxNzAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIyNTAiIHk9IjE3MCIgZmlsbD0iIzYyNjE2ZCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxODAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMTgwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjE4MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMTgwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIxODAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjE4MCIgZmlsbD0iIzFmMWQyOSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE1MCIgeT0iMTgwIiBmaWxsPSIjZmZmZGYyIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIxODAiIGZpbGw9IiMxZjFkMjkiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjE4MCIgZmlsbD0iI2ZmZmRmMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIwMCIgeT0iMTgwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjEwIiB5PSIxODAiIGZpbGw9IiNmZmZkZjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyMzAiIHk9IjE4MCIgZmlsbD0iIzFmMWQyOSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI0MCIgeT0iMTgwIiBmaWxsPSIjODA3ZjdlIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE5MCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMTkwIiBmaWxsPSIjMWYxZDI5IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSIxOTAiIGZpbGw9IiM4MDdmN2UiIC8+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjIwMCIgZmlsbD0iIzgwN2Y3ZSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTEwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIxMTAiIGZpbGw9IiNiOTE4NWMiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjEyMCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMTIwIiBmaWxsPSIjZmZmZmZmIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSIxMjAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjEyMCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMTIwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIxMjAiIGZpbGw9IiNmZmZmZmYiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMDAiIHk9IjEyMCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIyMCIgeT0iMTIwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjEzMCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMTMwIiBmaWxsPSIjZmZmZmZmIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSIxMzAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjEzMCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMTMwIiBmaWxsPSIjZmZmZmZmIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjAwIiB5PSIxMzAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyMjAiIHk9IjEzMCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxNDAiIGZpbGw9IiNiOTE4NWMiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE0MCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMTQwIiBmaWxsPSIjZmZmZmZmIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSIxNDAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjE0MCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMTQwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIxNDAiIGZpbGw9IiNmZmZmZmYiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMDAiIHk9IjE0MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIyMCIgeT0iMTQwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE1MCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTUwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTEwIiB5PSIxNTAiIGZpbGw9IiNmZmZmZmYiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjE1MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE1MCIgeT0iMTUwIiBmaWxsPSIjYjkxODVjIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIxNTAiIGZpbGw9IiNiOTE4NWMiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjE1MCIgZmlsbD0iI2ZmZmZmZiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjIwIiB5PSIxNTAiIGZpbGw9IiNiOTE4NWMiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE2MCIgZmlsbD0iI2I5MTg1YyIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMTYwIiBmaWxsPSIjYjkxODVjIiAvPjwvc3ZnPg==",
  },
  {
    chainId: "1",
    token: { name: "CryptoPunk", symbol: "CrypPunk" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC721",
    thumbnail:
      "https://i.seadn.io/gcs/files/716ecc2a1f4a491257b33d655f454963.png?auto=format&w=1000",
  },
  {
    chainId: "1",
    token: { name: "CryptoPunk", symbol: "CrypPunk" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC721",
    thumbnail:
      "https://i.seadn.io/gcs/files/85fedd4d6666c64e6618a783b6974d70.png?auto=format&w=1000",
  },
  {
    chainId: "1",
    token: { name: "mint.fun", symbol: "FUNPASS" },
    tokenAddress: "0x0000000000664ceffed39244a8312bd895470803",
    tokenId: "5922",
    tokenType: "ERC721",
  },
];

const RenderTokens = ({ tokens, tokenNames }) => {
  const matchedTokens = tokens.filter((token) =>
    tokenNames.some(
      (tokenNameToMatch) =>
        tokenNameToMatch.name === token.token.name &&
        tokenNameToMatch.address === token.tokenAddress
    )
  );

  return (
    <div className="no-scrollbar flex max-w-[360px] overflow-x-scroll">
      {/* {matchedTokens.map((token, index) => (
        <label className="block" key={index}>
          {token.token.name}
        </label>
      ))} */}
      {matchedTokens.map((token, index) => (
        <Tile
          key={index}
          label={token.token.name}
          onClick={() => console.log("Token selected:", token)}
          selected={false}
          src={token.tokenType === "ERC721" ? token.thumbnail : undefined}
          isAvatar={false}
        />
      ))}
    </div>
  );
};

const tokensToRender = [
  {
    name: "FWB",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
  {
    name: "Nouns DAO",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
  {
    name: "CryptoPunk",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
  {
    name: "mint.fun",
    address: "0x0000000000664ceffed39244a8312bd895470803",
  },
];

// const Tile = ({ label, onClick, src, selected, isAvatar }) => (
//   <div
//     onClick={onClick}
//     className={`flex ${isAvatar ? "bg-transparent" : "bg-blue-500"} ${
//       selected ? "opacity-75" : ""
//     }
//       m-1 max-w-[300px] cursor-pointer items-center justify-center break-words rounded-md px-4 py-2 font-bold text-white shadow-lg`}
//   >
//     {src ? (
//       <img
//         src={src}
//         alt={`NFT Thumbnail: ${label}`}
//         className="h-[150px] w-[150px] rounded-full border-0 object-cover"
//       />
//     ) : isAvatar ? (
//       <img
//         src={label}
//         alt="Profile Avatar"
//         className="h-[150px] w-[150px] rounded-full border-0 object-cover"
//       />
//     ) : (
//       <p className="max-w-[250px] break-words">{label}</p>
//     )}
//   </div>
// );

const Tile = ({ label, onClick, src, selected, isAvatar }) => (
  <div
    onClick={onClick}
    className={`flex ${isAvatar ? "bg-transparent" : "bg-[#000000]"} ${
      selected ? "opacity-75" : ""
    }
      m-1 max-w-[300px] cursor-pointer items-center justify-center break-words rounded-md px-4 py-2 font-bold text-white shadow-lg`}
  >
    {src ? (
      <img
        src={src}
        alt={`NFT Thumbnail: ${label}`}
        className="h-auto max-h-16 w-auto max-w-[150px] rounded-md border-0 object-cover object-center"
      />
    ) : isAvatar ? (
      <img
        src={label}
        alt="Profile Avatar"
        className="h-16 w-16 rounded-full border-0 object-cover"
      />
    ) : (
      <p className="max-w-[250px] break-words">{label}</p>
    )}
  </div>
);

export function CreateVault() {
  const { loading, profileData } = useProfileChainInfo(
    "0x6dd1E0028eF0a634b01E13B2291949255610b38f"
  );
  const { address, isConnected } = useAccount();
  const [buttonText, setButtonText] = useState("Connect Wallet");

  const { createProfile, isLoading, error } = useSignup();

  // Add more user-friendly error display based on how you handle UI/UX
  useEffect(() => {
    if (error) {
      console.log("An error occurred:", error);
      // OR: displaySnackbar("Oopsies! An error occurred 😢");
    }
  }, [error]);

  const handleSubmitProfile = async () => {
    if (!isConnected) {
      // If the isConnected property is missed, please call the function
      // related to your wallet in useAccount
      // useConnect();
      return;
    }

    // Construct metadata as a key-value json from fields
    const metadata = { ...fields };
    delete metadata?.handle;

    // Construct Profile information
    const profileData = {
      ethAddress: address,
      userhandle: fields.handle,
      metadata: metadata,
      publicTags: [], // Empty array or populated depending on the logic you have
      tokens: [], // Empty array or populated depending on the logic you have
    };

    const { token, success } = await createProfile(profileData);
    if (success) {
      console.log("JWT token received:", token);
      // Redirect to a protected page, handle JWT auth logic or anything else 🌹
    }
  };

  useEffect(() => {
    if (isConnected) {
      setButtonText("Create Identity Vault");
    } else {
      setButtonText("Connect Wallet to Create Vault");
    }
  }, [isConnected]);
  const [fields, setFields] = useState({
    name: "",
    handle: "",
    // prefill with ENS from address if possible
    ens: "",
    title: "",
    bio: "",
    currentLocation: "",
    futureLocation: "",
    avatar: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    console.log(fields);
  };

  return (
    <div className="mx-1 flex flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="w-full p-4">
        <div className="space-y-4">
          {userFields.map(({ key, placeholder, required }) => (
            <input
              type="text"
              key={key}
              name={key}
              value={fields[key]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              className="w-full rounded border border-gray-300 p-2"
            />
          ))}
        </div>
        <hr className="mt-[20px] h-[2px] rounded-sm bg-[#DDDDDD]" />
        {/* chain info div */}
        <h1 className="my-5 text-center font-unbounded text-xl">
          Onchain Footprint
        </h1>
        <RenderTokens tokens={mockBlockchainData} tokenNames={tokensToRender} />
        <hr className="mt-[20px] h-[2px] rounded-sm bg-[#DDDDDD]" />
      </div>
      <Web3Button />
      <button
        className="mb-5 mt-5 rounded bg-blue-500 px-20 py-2 font-unbounded font-bold text-white"
        onClick={() => handleSubmitProfile()}
      >
        {buttonText}
      </button>
    </div>
  );
}
