"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState<{ bitcoin?: number; ethereum?: number }>(
    {}
  );

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum"
    );
    socket.onopen = () => console.log("WebSocket 已成功連線！");
    socket.onerror = (err) => console.error("WebSocket 連線失敗:", err);

    //WebSocket 的「監聽器」
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("收到即時價格:", data);
      setPrices((prev) => ({ ...prev, ...data }));
    };

    return () => socket.close();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1>比特幣價格: ${prices.bitcoin}</h1>
          <h1>乙太幣價格: ${prices.ethereum}</h1>
        </div>
      </main>
    </div>
  );
}
