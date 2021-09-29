import { useState } from 'react';
import {
  IGreenLabel,
  GreenLabelTypeEnum,
} from '../../components/GreenLabelForm/GreenLabelForm';

export const useGreenLabelListContainerEffects = (
  data: ReadonlyArray<IGreenLabel>
) => {
  const [greenLabelList, setGreenLabelList] = useState(data);
  return {
    greenLabelList,
    handleAddNewGreenLabel: (newGreenLabel: IGreenLabel) => {
      setGreenLabelList([...greenLabelList, newGreenLabel]);
    },
    handleUpdateGreenLabel: (
      greenLabelType: GreenLabelTypeEnum,
      greenLabel: IGreenLabel
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
