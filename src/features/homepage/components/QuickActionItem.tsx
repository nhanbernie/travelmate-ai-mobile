import { View } from "react-native";
import { AppButton } from "@/components/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const QuickActionItem = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigate } = useSafeNavigation();

  const QUICK_ACTIONS: {
    title: string;
    icon: IoniconName;
    color: string;
    route?: string;
  }[] = [
    {
      title: t("homepage.quickActions.createTrip"),
      icon: "add",
      color: colors.primaryColor,
      route: "/trips/create",
    },
    {
      title: t("homepage.quickActions.explore"),
      icon: "compass",
      color: colors.secondaryColor,
      route: "/explore",
    },
    {
      title: t("homepage.quickActions.myPlaces"),
      icon: "location-outline",
      color: colors.tertiaryColor,
      route: "/trips",
    },
    {
      title: t("homepage.quickActions.settings"),
      icon: "settings-outline",
      color: colors.quaternaryColor,
      route: "/profile",
    },
  ];

  const handlePress = (route: string | undefined) => {
    if (route) {
      navigate(route);
    } else {
      // what need to handle
    }
  };
  return (
    <View className="flex-row flex-wrap gap-4">
      {QUICK_ACTIONS.map((action) => (
        <View key={action.title} className="w-[47%]">
          <AppButton
            title={action.title}
            onPress={() => handlePress(action.route)}
            className="bg-white border border-[#F3F4F6] rounded-3xl w-full"
            classNameButton="p-2 flex-row items-center"
            textClassName="text-[#1F2937] ml-3 flex-1"
            startIcon={
              <View
                className="flex-row items-center justify-center rounded-full p-3"
                style={{ backgroundColor: action.color }}
              >
                <Ionicons name={action.icon} size={20} color="white" />
              </View>
            }
          />
        </View>
      ))}
    </View>
  );
};

export default QuickActionItem;
