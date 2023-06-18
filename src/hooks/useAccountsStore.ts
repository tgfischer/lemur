import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type AccountData } from "../types";

type AccountsStoreState = {
  accounts: AccountData[];
  addAccount: (account: AccountData) => void;
};

export const useAccountsStore = create<AccountsStoreState>()(
  persist(
    (set) => ({
      accounts: [],
      addAccount: (newAccount: AccountData) => {
        set((state) => {
          const includesAccount = state.accounts.some(
            ({ user }) => user.actor_id === newAccount.user.actor_id,
          );

          if (includesAccount) {
            return {
              ...state,
              accounts: state.accounts.map((account) =>
                account.user.actor_id === newAccount.user.actor_id
                  ? newAccount
                  : account,
              ),
            };
          }

          return { ...state, accounts: [...state.accounts, newAccount] };
        });
      },
    }),
    {
      name: "accounts-store",
      getStorage: () => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
      }),
    },
  ),
);

export const useAccounts = (): AccountData[] =>
  useAccountsStore((state) => state.accounts);
