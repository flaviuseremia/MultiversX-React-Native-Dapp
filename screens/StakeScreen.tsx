import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useContext, useEffect } from "react";

import Settings from "../components/Settings";
import TotalEgld from "../components/TotalEgld";
import { GlobalStyles } from "../constants/styless";
import Button from "../components/UI/Button";
import {
  getAvailableEgld,
  getProvidersList,
  getStakedEgldProviders,
} from "../util/infos";
import { UserContext } from "../store/UserContext";

function StakeScreen() {
  const { availableBalance } = useContext(UserContext);
  const { setAvailableBalance } = useContext(UserContext);
  const { username } = useContext(UserContext);

  const [stakedEgldOnProvider, setStakedEgldOnProvider] = useState("X");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providersLocal, setProvidersLocal] = useState<
    { key: string; value: { name: string; address: string } }[]
  >([]);
  const [providersLocalStaked, setProvidersLocalStaked] = useState<
    {
      address: string;
      userActiveStake: string;
    }[]
  >([]);

  useEffect(() => {
    getProvidersList()
      .then((providersList: [string, { name: string; address: string }][]) => {
        const transformedArr = providersList.map(([index, value]) => ({
          key: index.trim().slice(0, -1),
          value: {
            name: value.name
              .replace("_", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            address: value.address,
          },
        }));

        setProvidersLocal(transformedArr);
      })
      .catch((error) => console.error(error));

    getStakedEgldProviders()
      .then((response) => {
        setProvidersLocalStaked(response);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getAvailableEgld()
      .then((response) => {
        setAvailableBalance(response.toFixed(2));
      })
      .catch((error) => console.error(error));
  }, [getAvailableEgld]);

  function emptyHandle() {}
  const [number, setNumber] = useState("");

  const handleInputChange = (value: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setNumber(value);
    }
  };

  function onSelectList() {
    const address = providersLocal.find(
      (entry) => entry.value.name === selectedProvider
    )?.value.address;

    const userActiveStake = providersLocalStaked.find(
      (entry) => entry.address === address
    )?.userActiveStake;
    const stakedEgld = userActiveStake
      ? (Number(userActiveStake) / 10 ** 18).toFixed(2)
      : "X";

    setStakedEgldOnProvider(stakedEgld);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Settings name={username} />
      <View style={styles.textContainer}>
        <TotalEgld title="Total EGLD Available" sum={availableBalance} />
      </View>
      <SelectList
        data={providersLocal.map((provider) => ({
          label: provider.key,
          value: provider.value.name,
        }))}
        setSelected={(val: string) => setSelectedProvider(val)}
        save="value"
        inputStyles={{ color: GlobalStyles.colors.secondary200 }}
        dropdownTextStyles={{ color: GlobalStyles.colors.secondary200 }}
        boxStyles={{ backgroundColor: GlobalStyles.colors.primary700 }}
        dropdownStyles={{ backgroundColor: GlobalStyles.colors.primary700 }}
        placeholder="Select Provider"
        onSelect={onSelectList}
      />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>
          <Text style={styles.xText}>{stakedEgldOnProvider}</Text> EGLD staked
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior="height">
        <View style={styles.inputAndTextContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={number}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>
          <Text style={styles.text}>EGLD</Text>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          children={"Stake"}
          onPress={emptyHandle}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textContainer: {
    alignItems: "center",
  },
  displayContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: "20%",
    borderRadius: 8,
  },
  displayText: {
    fontSize: 28,
    color: "white",
  },
  xText: {
    color: GlobalStyles.colors.secondary200,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputAndTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    padding: 8,
    minWidth: "20%",
  },
  input: {
    fontSize: 18,
    color: "white",
  },
  text: {
    color: GlobalStyles.colors.secondary200,
    fontSize: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 40,
    minWidth: "30%",
  },
});

export default StakeScreen;
