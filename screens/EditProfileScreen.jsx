// screens/EditProfileScreen.jsx
import React from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "../store";
import { updateProfile } from "../store/profileSlice"; // aşağıdaki eklemeyi bkz.
import ProfileForm from "../components/ProfileForm";

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const handleSubmit = (name, email) => {
    dispatch(updateProfile({ name, email }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      <ProfileForm
        initialName={profile?.name || ""}
        initialEmail={profile?.email || ""}
        submitLabel="Kaydet"
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
