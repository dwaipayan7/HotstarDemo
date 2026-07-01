export const COLORS = {
  lightBlue: "#1877F2",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  redColor: "#e0245e",
  textColorRed: "#FF0000",
  themePrimary: "#625982",
  themeSecondary: "#f3f3ff",
  white: "#ffffff",
  themePrimaryDark: "#353046",
  textBlack: "#070609",
  timeLineDivider: "#CFCBDC",
  dotColor: "#978FB2",
  modalBackgroundColor: "#FAFAFF",
  modalIconWidth: "#EBEAF1",
  headerActionColor: "#EBEBFF",
  modalColor2: "#F8FAFD",
  themeBackground: "#4c4464",
  themeDot: "#CFCCDC",
  divider: "#F3F3F7",
  divider2: "#E0E2F4",
  borderColorCard: "#E3E3ED",
  addReqColor: "#EAEAF6",
  disabledInputBg: "#EFEFFB",
  disabledPlaceholderTextColor: "#A59EBD",
  tabBgColor: "#ECF9F2",
  primaryColor: "#9147ff",
  secondaryColor: "#bf94ff",
  neutralColor: "#0d0b14",
  teriaryColor: "#6420c8",
  gardientColors: ["#05010D", "#140821", "#24103D", "#05010D"] as any,
  lightGray: "#657786",
  gradient2: ["transparent", "rgba(5, 1, 13, 0.5)", "#05010D"] as any,
  green: "#46d369",
  gray: "#aaa",
  gradient1: "#05010D",
  golden: "#FFD700",
  premium: "#FFD70022",
  backgroundColor: "#05010D",
  tabInactiveColor: "#657786",
  tabActiveColor: "#1DA1F2",
  chipBackgroundColor: "#f0f0f0",
  chipBorderColor: "#e0e0e0",
};

//This is for the testing of the --> toggle dark - light mode

export const getThemeColors = (isDark: boolean) => ({
  background: isDark ? "#05010D" : "#F5F5F5",
  surface: isDark ? "#140821" : "#FFFFFF",
  card: isDark ? "#1E1035" : "#EEEEEE",

  textPrimary: isDark ? "#FFFFFF" : "#0D0B14",
  textSecondary: isDark ? "#6B7280" : "#444444",

  border: isDark ? "#2a1f3d" : "#D1D5DB",

  gradientColors: isDark
    ? ["#05010D", "#140821", "#24103D", "#05010D"]
    : ["#F5F5F5", "#EAEAF6", "#E0E2F4", "#F5F5F5"],

  ...COLORS,
});
