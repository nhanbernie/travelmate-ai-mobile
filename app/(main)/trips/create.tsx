import React from "react";
import ScreenWrapper from "@/components/layouts/ScreenWrapper ";
import SubHeader from "@/components/layouts/SubHeader";
import CreateItineraryScreen from "@/features/create-itinerary/CreateItineraryScreen";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { useTabBarContext } from "@/contexts/TabBarContext";
import { useTranslation } from "react-i18next";

const CreateItinerary = () => {
  const { navigate } = useSafeNavigation();
  const { setTabBarVisible } = useTabBarContext();
  const { t } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      setTabBarVisible(false);

      return () => {
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  const handleCancel = () => {
    navigate("/trips");
  };

  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <SubHeader
        showBackButton={true}
        onBackPress={handleCancel}
        title={t("itinerary.createTitle")}
      />
      <CreateItineraryScreen />
    </ScreenWrapper>
  );
};

export default CreateItinerary;
