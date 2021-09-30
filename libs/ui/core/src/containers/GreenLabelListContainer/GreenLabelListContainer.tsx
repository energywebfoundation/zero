import styled from '@emotion/styled';
import GreenLabelList from '../../components/GreenLabelList/GreenLabelList';
import { IGreenLabel } from '../../components/GreenLabelForm/GreenLabelForm';
import { useGreenLabelListContainerEffects } from './GreenLabelListContainer.effects';

export interface GreenLabelListContainerProps {
  data: Array<IGreenLabel>;
  handleValueChanged: (data: Array<IGreenLabel>) => void;
}

const StyledGreenLabelListContainer = styled.div`
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
    <StyledGreenLabelListContainer>
      <GreenLabelList
        greenLabelList={greenLabelList}
        handleUpdateGreenLabel={handleUpdateGreenLabel}
        handleDeleteGreenLabel={handleDeleteGreenLabel}
        handleAddNewGreenLabel={handleAddNewGreenLabel}
      />
    </StyledGreenLabelListContainer>
  );
};
