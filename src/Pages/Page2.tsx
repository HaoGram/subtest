import {MapStyles, Projections, useMapStore} from '@/store/map';
import {MapComponent} from '@/components/MapComponent';
import {useCallback} from 'react';
import {Map} from 'mapbox-gl';
import {Space, Switch, Typography} from '@douyinfe/semi-ui';
import {T} from '@/components/common/Translate';
import {useSelector} from '@/utils';

const {Title, Text} = Typography;

export const Page2 = () => {
  const {
    setMap,
    style,
    setStyle,
    projection,
    setProjection
  } = useMapStore(useSelector(['setMap', 'style', 'setStyle', 'projection', 'setProjection']));
  const callback = useCallback((m?: Map) => {
    setMap(m);
    return () => {
      setMap(undefined);
    };
  }, [setMap]);

  return (
    <>
      <Title heading={5}>Page 2</Title>
      <Space vertical>
        <Space>
          <Switch
            checked={style === MapStyles.Satellite}
            onChange={(v) => setStyle(v ? MapStyles.Satellite : MapStyles.Vector)}
          />
          <Text>
            <T z="Satellite or Vector"/>
          </Text>
        </Space>
        <Space>
          <Switch
            checked={projection === Projections.Globe}
            onChange={(v) => setProjection(v ? Projections.Globe : Projections.Mercator)}
          />
          <Text>
            <T z="Mercator or Globe"/>
          </Text>
        </Space>
      </Space>
      <MapComponent callback={callback}/>
    </>
  );
};
