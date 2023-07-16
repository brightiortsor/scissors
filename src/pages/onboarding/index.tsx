import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Icon,
  Box,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import HomePage from "..";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProgressBar from "@/components/atom/progressBar";

type ProfileData = {
  displayName: string;
  bio: string;
  avatar: File | null;
};

const steps = [
  {
    title: "Welcome to Chatter!",
    message: "Your one stop for all things blogging!",
    bgColor: "#1a4a74",
    bgColor1: "#254a6a",
  },
  {
    title: "Complete Your Profile",
    message: "Tell us a bit about yourself!",
    bgColor: "#0c5186",
  },
];

const Onboarding: React.FC = () => {
  const [page, setPage] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: "",
    bio: "",
    avatar: null,
  });

  const handlePageChange = () => {
    if (page < 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      //   const uploadTask = storage.ref(`avatars/${file.name}`).put(file);

      //   uploadTask.on(
      //     "state_changed",
      //     (snapshot: { bytesTransferred: number; totalBytes: number }) => {
      //       // Calculate the upload progress
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setUploadProgress(progress);
      //     },
      //     (error: any) => {
      //       // Handle any errors during the upload
      //       console.error("Avatar upload error:", error);
      //     },
      //     () => {
      //       // Handle the upload completion
      //       // Get the avatar download URL
      //       uploadTask.snapshot.ref
      //         .getDownloadURL()
      //         .then((downloadURL: any) => {
      //           // Update the profile data with the download URL
      //           setProfileData((prevProfileData) => ({
      //             ...prevProfileData,
      //             avatar: downloadURL,
      //           }));
      //           // Reset the upload progress
      //           setUploadProgress(0);
      //         })
      //         .catch((error: any) => {
      //           // Handle any errors while getting the download URL
      //           console.error("Avatar download URL error:", error);
      //         });
      //     }
      //   );
    }
  };

  const handleSubmit = () => {
    // Perform submission logic here
    // ...

    // Redirect to the homepage
    router.push("/");
  };

  return (
    <>
      <Flex
        width={"100%"}
        height={"100vh"}
        flexDir={"column"}
        justify={"center"}
        align={"center"}
      >
        <OnboardingFLow
          page={page}
          change={handlePageChange}
          profileData={profileData}
          onProfileChange={handleProfileChange}
          onAvatarChange={handleAvatarChange}
          onSubmit={handleSubmit}
        />
      </Flex>
    </>
  );
};

type OnboardingFlowProp = {
  page: number;
  change: () => void;
  profileData: ProfileData;
  onProfileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

const OnboardingFLow: React.FC<OnboardingFlowProp> = ({
  page,
  change,
  profileData,
  onProfileChange,
  onAvatarChange,
  onSubmit,
}) => {
  const { title, bgColor, bgColor1, message } = steps[page];

  const renderContent = () => {
    if (page === 0) {
      return (
        <Flex flexDir={"column"} align={"center"} p={"10"} color={"gray.400"}>
          <Text fontSize={"4xl"} mb={4}>
            {title}
          </Text>
          <Text>{message}</Text>
          <Button mt={4} onClick={change} colorScheme="teal">
            Next
          </Button>
        </Flex>
      );
    } else if (page === 1) {
      return (
        <Flex flexDir={"column"} align={"center"} p={"10"} color={"gray.300"}>
          <Text fontSize={"4xl"} mb={4}>
            {title}
          </Text>
          <Text>{message}</Text>
          <Box mt={6}>
            <Input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={profileData.displayName}
              onChange={onProfileChange}
            />
            <Textarea
              name="bio"
              placeholder="Bio"
              mt={2}
              value={profileData.bio}
              onChange={onProfileChange}
            />
            <FileUpload>
              <label htmlFor="avatar-upload" className="custom-file-upload">
                <Icon
                  position={"absolute"}
                  as={AiOutlineCloudUpload}
                  fontSize={"2rem"}
                  right={"40px"}
                />
                Upload an avatar
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                />
              </label>
            </FileUpload>
          </Box>
          <Button mt={4} onClick={onSubmit} colorScheme="teal">
            Submit
          </Button>
        </Flex>
      );
    }
  };

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      height={"100%"}
      bgColor={bgColor}
      justify={"space-between"}
    >
      <Flex justify={"center"} mt={"10"}>
        {page > 0 && (
          <Icon
            as={GrFormPrevious}
            w={10}
            h={10}
            onClick={change}
            color={"white"}
            mr={"4"}
            cursor={"pointer"}
          />
        )}
        {page < steps.length - 1 ? (
          <Icon
            as={GrFormNext}
            w={10}
            h={10}
            mt={"1"}
            onClick={change}
            color={"white"}
            cursor={"pointer"}
          />
        ) : (
          <Icon
            as={MdOutlineNavigateNext}
            w={10}
            h={10}
            color={"white"}
            cursor={"pointer"}
          />
        )}
      </Flex>
      {renderContent()}
      <Flex justify={"flex-end"} mr={"10"}>
        {/* <RxDotFilled w={4} h={4} color={bgColor1} /> */}
        {/* <RxDot w={4} h={4} color={"white"} ml={"2"} /> */}
      </Flex>
    </Flex>
  );
};

export default Onboarding;

const FileUpload = styled.div`
  .custom-file-upload {
    width: 100%;
    position: relative;
    margin-top: 10px;
    display: inline-block;
    padding: 8px 12px;
    background-color: #3182ce;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .custom-file-upload:hover {
    background-color: #4299e1;
  }

  .custom-file-upload input[type="file"] {
    display: none;
  }
`;
