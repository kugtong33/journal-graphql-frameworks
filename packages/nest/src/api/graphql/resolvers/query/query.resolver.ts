import { Query, Resolver, Args } from '@nestjs/graphql';

@Resolver('Query')
export class QueryResolver {
  @Query()
  async account(@Args('id') id: string) {}
}