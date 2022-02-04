import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Test case.'
})
export class TestCase {
  @Field(() => String, {
    nullable: false,
    description: 'Test case name.'
  })
  name: string;

  @Field(() => Float, {
    nullable: false,
    description: 'Test case score.'
  })
  score: number;

  @Field(() => String, {
    nullable: false,
    description: 'Test case output.'
  })
  output: string;
}
