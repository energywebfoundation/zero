import { useState } from 'react';
import {
  GreenLabelDto,
  GreenLabelTypeEnum,
} from '../../components/green-label-form/green-label-form';

export const useGreenLabelListContainerEffects = (
  data: ReadonlyArray<GreenLabelDto>
) => {
  const [greenLabelList, setGreenLabelList] = useState(data);
  return {
    greenLabelList,
    handleAddNewGreenLabel: (newGreenLabel: GreenLabelDto) => {
      setGreenLabelList([...greenLabelList, newGreenLabel]);
    },
    handleUpdateGreenLabel: (
      greenLabelType: GreenLabelTypeEnum,
      greenLabel: GreenLabelDto
    ) => {
      setGreenLabelList(
        greenLabelList.map((el) =>
          el.type === greenLabelType ? greenLabel : el
        )
      );
    },
    handleDeleteGreenLabel: (greenLabelType: any) => {
      setGreenLabelList(
        greenLabelList.filter((el) => el.type !== greenLabelType)
      );
    },
  };
};
