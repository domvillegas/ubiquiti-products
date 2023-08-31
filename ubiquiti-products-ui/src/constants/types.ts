export type DeviceData =
  | {
      id: string;
      unifi: {
        network: {
          radios: {
            na: { maxSpeedMegabitsPerSecond: string; maxPower: string };
          };
          numberOfPorts: string;
        };
      };
      line: {
        name: string;
        id: string;
      };
      product: {
        name: string;
      };
      shortnames: string[];
      icon: {
        resolutions: number[][];
        id: string;
      };
    }[]
  | undefined;

export type DeviceDisplayOption = 'list' | 'grid';
