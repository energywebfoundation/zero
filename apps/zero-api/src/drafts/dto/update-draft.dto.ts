import { CreateDraftDto } from './create-draft.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateDraftDto extends PartialType(OmitType(CreateDraftDto, ['draftType'])) {}
