import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { FileService } from 'src/helpers/file.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService, FileService],
  exports: [CatsService]
})
export class CatsModule {}
