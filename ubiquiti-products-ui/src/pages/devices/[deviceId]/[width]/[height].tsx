import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './[height].module.css';
import NavButton from '@/components/NavButton/NavButton';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { useDeviceData } from '@/contexts/deviceData';

const SingleDevicePage = () => {
  const router = useRouter();
  const { query } = router;

  const { deviceData } = useDeviceData();
  const [isCopied, setIsCopied] = useState(false);
  const [jsonIsVisible, setJsonIsVisible] = useState(false);

  const jsonRef = useRef(null);

  const rawSingleDeviceData = deviceData?.filter((device) => {
    return device.icon.id === query.deviceId;
  });

  const singleDeviceData = rawSingleDeviceData?.[0];

  const currentDeviceIndex = deviceData?.findIndex((device) => {
    return device.id === singleDeviceData?.id;
  });

  const adjacentDevices = {
    previousDevice: deviceData?.[(currentDeviceIndex as number) - 1],
    nextDevice: deviceData?.[(currentDeviceIndex as number) + 1],
  };

  const adjacentDevicePath = (direction: 'forward' | 'back') => {
    const { previousDevice, nextDevice } = adjacentDevices;
    if (direction === 'back' && previousDevice) {
      //This variable dynamically selects for a device's largest possible set of image resolutions
      const largestResolution =
        previousDevice?.icon.resolutions[
          previousDevice?.icon.resolutions.length - 1
        ];
      return `/devices/${previousDevice?.icon.id}/${largestResolution?.[0]}/${largestResolution?.[1]}`;
    } else if (direction === 'forward' && nextDevice) {
      const largestResolution =
        nextDevice?.icon.resolutions[nextDevice?.icon.resolutions.length - 1];
      return `/devices/${nextDevice?.icon.id}/${largestResolution?.[0]}/${largestResolution?.[1]}`;
    }
  };

  const deviceJSON = JSON.stringify(singleDeviceData, null, 2);

  const table = (tableData: { label: string; value: string | undefined }[]) => {
    return tableData.map((data, index) => {
      return (
        <div key={index} className={styles.row}>
          <span className="body1 bold nowrap">{data.label}</span>
          <span className="body2">{data.value}</span>
        </div>
      );
    });
  };

  const navButtonClickHandler = (direction: 'back' | 'forward') => {
    setIsCopied(false);
    setJsonIsVisible(false);
    if (adjacentDevicePath(direction)) {
      router.push(adjacentDevicePath(direction) as Url);
    }
  };

  const jsonButtonClickHandler = () => {
    setJsonIsVisible(!jsonIsVisible);
    setTimeout(() => {
      window.scrollTo({ top: 9999, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={styles.singleDevicePage}>
      <div className={styles.controlsRow}>
        <Link href="/" className={styles.backButton}>
          <NavButton buttonText="Back" direction="back" />
        </Link>

        <div className={styles.arrowPair}>
          <NavButton
            disabled={!Boolean(adjacentDevices.previousDevice)}
            direction="back"
            clickEffect={() => navButtonClickHandler('back')}
          />

          <NavButton
            disabled={!Boolean(adjacentDevices.nextDevice)}
            direction="forward"
            clickEffect={() => navButtonClickHandler('forward')}
          />
        </div>
      </div>
      <div className={styles.deviceContainer}>
        <div className={styles.imageContainer}>
          <img
            src={`https://static.ui.com/fingerprint/ui/icons/${query.deviceId}_${query.width}x${query.height}.png`}
            alt={singleDeviceData?.product?.name}
          />
        </div>
        <div className={styles.deviceDetailsContainer}>
          <div className={styles.mainDetails}>
            <h2>{singleDeviceData?.product?.name}</h2>
            <span className="body2">{singleDeviceData?.line?.name}</span>
          </div>

          {table([
            { label: 'Product Line', value: singleDeviceData?.line?.name },
            { label: 'ID', value: singleDeviceData?.line?.id },
            { label: 'Name', value: singleDeviceData?.product?.name },
            {
              label: 'Short Name(s)',
              value: singleDeviceData?.shortnames?.join(', '),
            },
            {
              label: 'Max Power',
              value: `${
                singleDeviceData?.unifi?.network?.radios?.na?.maxPower
                  ? singleDeviceData?.unifi?.network?.radios?.na?.maxPower
                  : 'n/a'
              }`,
            },
            {
              label: 'Speed',
              value: `${
                singleDeviceData?.unifi?.network?.radios?.na
                  ?.maxSpeedMegabitsPerSecond
                  ? singleDeviceData?.unifi?.network?.radios?.na
                      ?.maxSpeedMegabitsPerSecond + ' Mbps'
                  : 'n/a'
              }`,
            },
            {
              label: 'Number of Ports',
              value: `${
                singleDeviceData?.unifi?.network?.numberOfPorts
                  ? singleDeviceData?.unifi?.network?.numberOfPorts
                  : 'n/a'
              }`,
            },
          ])}
          <div className={styles.jsonButtonContainer}>
            <Button
              className={styles.jsonButton}
              variant="cta"
              buttonText="See All Details as JSON"
              buttonEffect={jsonButtonClickHandler}
            />
          </div>
        </div>
      </div>
      <div ref={jsonRef} />
      {jsonIsVisible && (
        <div className={styles.deviceJsonContainer}>
          <pre>{deviceJSON}</pre>
          <Button
            className={styles.copyButton}
            variant="outline"
            buttonText={isCopied ? 'Copied' : 'Copy'}
            buttonEffect={() => {
              navigator.clipboard.writeText(deviceJSON);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1500);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleDevicePage;
