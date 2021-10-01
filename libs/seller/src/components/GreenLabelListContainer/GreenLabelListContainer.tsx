import styled from '@emotion/styled';
import { GreenLabelList } from '../GreenLabelList';
import { IGreenLabel } from '../GreenLabelForm';
import { useGreenLabelListContainerEffects } from './GreenLabelListContainer.effects';

export interface GreenLabelListContainerProps {
  data: Array<IGreenLabel>;
  handleValueChanged: (data: Array<IGreenLabel>) => void;
}

const StyledDiv = styled.div`
  flex-grow: 1;
`;

export const GreenLabelListContainer = ({
  data,
}: GreenLabelListContainerProps) => {
  const {
    greenLabelList,
    handleAddNewGreenLabel,
    handleDeleteGreenLabel,
    handleUpdateGreenLabel,
  } = useGreenLabelListContainerEffects(data);
  return (
    <StyledDiv>
      <GreenLabelList
        greenLabelList={greenLabelList}
        handleUpdateGreenLabel={handleUpdateGreenLabel}
        handleDeleteGreenLabel={handleDeleteGreenLabel}
        handleAddNewGreenLabel={handleAddNewGreenLabel}
      />
    </StyledDiv>
  );
};
