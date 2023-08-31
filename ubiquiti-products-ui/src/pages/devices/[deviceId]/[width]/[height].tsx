import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './[height].module.css';
import NavButton from '@/components/NavButton/NavButton';
import { DeviceDataContext } from '@/contexts/contexts';
import Button from '@/components/Button/Button';

const Check = () => {
  const router = useRouter();
  const { query } = router;

  const { deviceData, setDeviceData } = useContext(DeviceDataContext);

  //improve this type
  const singleDeviceData = deviceData?.filter((device: any) => {
    return device.icon.id === query.deviceId;
  });

  console.log(singleDeviceData[0]);

  const table = (tableData: { label: string; value: string }[]) => {
    return tableData.map((data) => {
      return (
        <div className={styles.row}>
          <span className="body1 bold">{data.label}</span>
          <span className="body2">{data.value}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.singleDevicePage}>
      <div className={styles.controlsRow}>
        <NavButton buttonText="Back" direction="back" clickEffect={() => ''} />
        <div className={styles.arrowPair}>
          <NavButton direction="back" clickEffect={() => ''} />
          <NavButton direction="forward" clickEffect={() => ''} />
        </div>
      </div>
      <div className={styles.deviceContainer}>
        <div className={styles.imageContainer}>
          <img
            //add alt
            src={`https://static.ui.com/fingerprint/ui/icons/${query.deviceId}_${query.width}x${query.height}.png`}
            alt={singleDeviceData[0]?.product.name}
          />
        </div>
        <div className={styles.deviceDetailsContainer}>
          <h2>{singleDeviceData[0]?.product.name}</h2>{' '}
          <span className="body2">{singleDeviceData[0]?.line.name}</span>
          {table([
            { label: 'Product Line', value: singleDeviceData[0]?.line.name },
            { label: 'ID', value: singleDeviceData[0]?.line.id },
            { label: 'Name', value: singleDeviceData[0]?.product.name },
            {
              label: 'Short Names',
              value: singleDeviceData[0]?.shortnames.join(', '),
            },
            {
              label: 'Max Power',
              value: singleDeviceData[0]?.unifi.network.radios.na.maxPower,
            },
            {
              label: 'Speed',
              value: `${singleDeviceData[0]?.unifi.network.radios.na.maxSpeedMegabitsPerSecond} Mbps`,
            },
            {
              label: 'Number of Ports',
              value: singleDeviceData[0]?.unifi.network.numberOfPorts,
            },
          ])}
          <Button variant="cta" buttonText="See All Details as JSON" buttonEffect={() => ''} />
        </div>
      </div>
    </div>
  );
};

export default Check;
