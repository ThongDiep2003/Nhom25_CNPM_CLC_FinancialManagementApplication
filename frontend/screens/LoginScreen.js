import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={tw`flex-1 bg-white justify-center items-center px-6`}>
      {/* Title */}
      <Text style={tw`text-2xl font-bold text-purple-700`}>Welcome Back</Text>
      <Text style={tw`text-gray-500 mt-2`}>Hello there, sign in to continue</Text>

      {/* Custom Image from assets */}
      <View style={tw`my-6`}>
        <View style={tw`bg-purple-100 rounded-full p-6`}>
          <Image
            source={require('../assets/lock.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Input Fields */}
      <View style={tw`w-full`}>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-4 mb-4`}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={tw`border border-gray-300 rounded-lg p-4 mb-4 flex-row items-center`}>
          <TextInput
            style={tw`flex-1`}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={tw`text-right text-gray-500 mb-6`}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={tw`bg-purple-700 rounded-lg w-full py-4 mb-6`}>
        <Text style={tw`text-white text-center text-lg`}>Sign in</Text>
      </TouchableOpacity>

      {/* Fingerprint Icon */}
      <TouchableOpacity>
        <Ionicons name="finger-print" size={50} color="purple" />
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={tw`flex-row items-center mt-4`}>
        <Text style={tw`text-gray-500`}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={tw`text-purple-700 ml-2`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
