import Topbar from "@/components/Topbar/Topbar";
// import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/hooks/useHasMounted";
// import { problems } from "@/utils/problems";
// import { Problem } from "@/utils/types/problem";
import React from "react";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import Image from "next/image";
// import Calendar from "react-github-contribution-calendar";
// import GitHubCalendar from "react-github-calendar";
import { useState, useRef } from "react";

// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// import Tooltip from "@uiw/react-tooltip";
// import HeatMap from "@uiw/react-heat-map";
// import Link from "next/link";

type UserProfileProps = {
  username: string;
};

const UserProfile: React.FC<UserProfileProps> = () => {
  const hasMounted = useHasMounted();
  const [user] = useAuthState(auth);
  

  if (!hasMounted) return null;

  return (
    <div>
      <Topbar />
      EBEB
    </div>
  );
};
export default UserProfile;
