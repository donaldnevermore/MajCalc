import ParallaxScrollView from "@/components/ParallaxScrollView";
import { calculateBasicPoint, calculatePay } from "@/lib/calc-result";
import { useState } from "react";
import { NumberInput, SegmentedControl, Text, View } from "react-native-ui-lib";

export default function TabTwoScreen() {
  const [han, setHan] = useState(1);
  const [fu, setFu] = useState(20);
  const [dealer, setDealer] = useState(0);
  const [ron, setRon] = useState(0);

  const basicPoint = calculateBasicPoint(han, fu);
  const isDealer = dealer === 0;
  const isRon = ron === 1;
  const point = calculatePay(basicPoint, isRon, isDealer);

  const changeHan = (data: any) => {
    if (data.type === "valid" && data.number >= 1) {
      setHan(data.number);
    }
  }

  const changeFu = (data: any) => {
    if (data.type === "valid" && data.number >= 20) {
      setFu(data.number);
    }
  }

  return (
    <ParallaxScrollView>
      <View>
        <NumberInput
          trailingText={"番"} initialNumber={han} fractionDigits={0} onChangeNumber={changeHan}
        />
        <NumberInput
          trailingText={"符"} initialNumber={fu} fractionDigits={0} onChangeNumber={changeFu}
        />
      </View>
      <SegmentedControl
        segments={[{ label: "庄家" }, { label: "闲家" }]}
        initialIndex={dealer}
        onChangeIndex={(v) => setDealer(v)}
      />
      <SegmentedControl
        segments={[{ label: "自摸" }, { label: "荣和" }]}
        initialIndex={ron}
        onChangeIndex={(v) => setRon(v)}
      />
      <Text>
        {han} 番 {fu} 符，{point}
      </Text>
    </ParallaxScrollView>
  );
}
