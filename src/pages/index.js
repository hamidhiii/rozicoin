import { activityScreens } from "./activity/ActivityPages.jsx";
import { authScreens } from "./auth/AuthPages.jsx";
import { kycScreens } from "./kyc/KycPages.jsx";
import { sendScreens } from "./send/SendPages.jsx";
import { settingsScreens } from "./settings/SettingsPages.jsx";
import { swapScreens } from "./swap/SwapPages.jsx";
import { walletScreens } from "./wallet/WalletPages.jsx";

export const screenRegistry = {
  ...authScreens,
  ...kycScreens,
  ...walletScreens,
  ...sendScreens,
  ...swapScreens,
  ...activityScreens,
  ...settingsScreens,
};

