import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useGetCollectionsIndicators } from '@/hooks/useGetCollectionsIndicators';
import _ from 'lodash';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
import { useGetLots } from '@/hooks/useGetLots';
import { CollectionsIndicator } from '@/types';
import { useMemo } from 'react';

const IndicatorsPageWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <IndicatorsPage />
    </ProtectedRoute>
  );
};

const getPlotData = (indicators: CollectionsIndicator[]) => {
  const ind = indicators?.map((indicator) => {
    return {
      monthYear: `${indicator.year}-${indicator.month}`,
      ...indicator,
    };
  });

  const plotData = Object.values(_.groupBy(ind, 'monthYear')).map((el) => {
    const finalMonthData: { [key: string]: number | string } = {
      monthYear: el[0].monthYear,
    };

    el.forEach((indicator) => {
      finalMonthData[indicator.lote] = indicator.total;
    });

    return finalMonthData;
  });

  return plotData;
};

const IndicatorsPage = () => {
  const { lots } = useGetLots();
  const { indicators } = useGetCollectionsIndicators();

  const plotData = useMemo(() => {
    return getPlotData(indicators ?? []);
  }, [indicators]);

  const lotSources = lots?.map((lot) => ({
    name: lot.name,
    value: lot.name,
  }));

  return (
    <div className='flex justify-center p-10'>
      <Chart width={'80%'} palette='Violet' dataSource={plotData}>
        {/* <CommonSeriesSettings argumentField='monthYear' type='stackedbar' /> */}
        {lotSources?.map((item) => (
          <Series
            argumentField='monthYear'
            type='stackedbar'
            key={item.value}
            valueField={item.value}
            name={item.name}
          />
        ))}
        <Margin bottom={20} />
        <ArgumentAxis
          valueMarginsEnabled={false}
          discreteAxisDivisionMode='crossLabels'
        >
          <Grid visible={true} />
        </ArgumentAxis>
        <Legend
          verticalAlignment='bottom'
          horizontalAlignment='center'
          itemTextPosition='bottom'
        />
        <Export enabled={true} />
        <Title text='Indicador de recogidas'>
          <Subtitle text='(Cantidad de racimos por mes por lote)' />
        </Title>
        <Tooltip
          enabled={true}
          shared={true}
          customizeTooltip={customizeTooltip}
        />
      </Chart>
    </div>
  );
};

const customizeTooltip = (pointInfo) => {
  return {
    html: `
    <div class='flex items-center justify-center gap-3'>
      <div class='text-lg font-bold text-gray-800'>
        <span>${pointInfo.argumentText}</span>
        <span>-</span>
        <span>${pointInfo.seriesName}</span>: 
      </div>
      <div class='text-lg text-gray-800'>
        <span>${pointInfo.total} racimos</span>
      </div>
      </div>
    </div>`,
  };
};

export default IndicatorsPageWrapper;
