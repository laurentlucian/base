import { Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-black pt-4">
      <ScrollView className="w-full">
        <View className="flex flex-row items-center justify-between px-4 ">
          <Text className="text-2xl font-bold text-white">Something</Text>
          <Link href="/modal" asChild>
            <Pressable className="rounded-full bg-gray-800 px-5 py-3">
              <Text className="text-white">Tap</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
