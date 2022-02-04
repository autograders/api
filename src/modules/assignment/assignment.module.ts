import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Assignment, AssignmentSchema } from '@models/assignment';

import { AssignmentResolver } from './assignment.resolver';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema }
    ])
  ],
  providers: [AssignmentResolver, AssignmentService]
})
export class AssignmentModule {}
