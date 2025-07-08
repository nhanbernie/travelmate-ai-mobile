import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

const AVATAR_URL =
  'https://secure.gravatar.com/avatar/849c1f2e516512d3d34ff6b7fc34d88f?s=300&d=mm&r=g';

interface AvatarProps {
  avatarUrl?: string;
  size?: number;
  onPress?: () => void;
}

const Avatar = ({ avatarUrl, size, onPress }: AvatarProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg">
        <Image
          source={{
            uri: avatarUrl ? avatarUrl : AVATAR_URL,
          }}
          style={{
            width: size || 40,
            height: size || 40,
            borderRadius: (size || 40) / 2,
          }}
        />
      </View>
    </Pressable>
  );
};

export default Avatar;
