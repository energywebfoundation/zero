import styled from '@emotion/styled';
import GreenLabelList from '../../components/green-label-list/green-label-list';
import { useGreenLabelListContainerEffects } from './green-label-list-container.effects';
import { GreenLabelDto } from '../../components/green-label-form/green-label-form';

/* eslint-disable-next-line */
export interface GreenLabelListContainerProps {
  data: Array<GreenLabelDto>;
  handleValueChanged: (data: Array<GreenLabelDto>) => void;
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

export default GreenLabelListContainer;
