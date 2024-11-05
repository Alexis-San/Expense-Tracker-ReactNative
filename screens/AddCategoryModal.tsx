import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomInput } from "../components/AddTransactionForm";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/AppContext";
import { RootStackScreenProps } from "../types";

export default function AddCategoryModal({
  route,
}: RootStackScreenProps<"AddCategoryModal">) {
  const navigation = useNavigation();
  const categoryType = route?.params?.type;
  const { addCategory } = React.useContext(AppContext);
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const [selectedImageIndex, setSelectedImage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCategoryImages() {
      setLoading(true);
      const response = await fetch(
        `https://free-3dicons-api.vercel.app/search?q=${title}`
      );
      const data = await response.json();
      console.log(data);
      setImages(data.data);
      setLoading(false);
    }

    if (title.length < 3) {
      return;
    }
    const timer = setTimeout(() => {
      getCategoryImages();
    }, 500);
    return () => clearTimeout(timer);
  }, [title]);

  const submitHandler = async () => {
    const newCategory = {
      id: (Math.random() * 100).toString(),
      name: title,
      src: images[selectedImageIndex],
    };
    await addCategory(newCategory, categoryType);
    navigation.goBack();
  };

  return (
    <View
      style={{
        alignItems: "center",
        // flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        minHeight: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <View className="w-[87%] flex-col justify-between h-full  ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="h-full flex justify-between relative flex-1 ">
            <View>
              <CustomInput
                title={"Category Name"}
                props={{
                  // placeholder: "eg. Dinner with friends",
                  value: title,
                  onChangeText: (text: string) => setTitle(text),
                }}
              />
              {images.length > 0 && (
                <Text className="text-gray-800 text-lg font-semibold ">
                  Select Image
                </Text>
              )}
              <ScrollView horizontal className="flex flex-row ">
                {loading && (
                  <View className="p-2 rounded bg-gray-100">
                    <ActivityIndicator size="small" color="#0000ff" />
                  </View>
                )}
                {!loading &&
                  images.map((image, i) => (
                    <View
                      key={i}
                      className={`p-2 rounded ${
                        selectedImageIndex === i ? "bg-gray-100" : ""
                      } `}
                    >
                      <Pressable
                        onPress={() => {
                          setSelectedImage(i);
                        }}
                      >
                        <Image
                          source={{ uri: image }}
                          style={{ width: 50, height: 50 }}
                        />
                      </Pressable>
                    </View>
                  ))}
              </ScrollView>
            </View>
            <Pressable
              onPress={submitHandler}
              className={`  rounded-xl bg-income w-full py-3    `}
            >
              <Text className="text-xl text-white text-center ">Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
