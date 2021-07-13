import {
  Controller
} from '@nestjs/common';
import { FilesService } from './files.service';
import { resolve as pathResolve } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
}
