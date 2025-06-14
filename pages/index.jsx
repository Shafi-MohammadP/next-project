import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/components/constants/constants";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, []);

  return <p>Loading...</p>;
}
