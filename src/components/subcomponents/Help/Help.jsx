import React from "react";
import "./Help.css";
import { motion } from "framer-motion";
import { animation } from "../../../styles/motion";
import GradientBox from "../../GradientBox/GradientBox";

const Help = () => {
  return (
    <motion.div className="help__screen">
      <GradientBox>AI Image와 AI Video 기능을 이용해보세요!</GradientBox>
    </motion.div>
  );
};

export default Help;
