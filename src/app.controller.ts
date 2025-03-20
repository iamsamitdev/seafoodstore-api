import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpCode } from '@nestjs/common'
// import { AppService } from './app.service'

// กำหนด Data Transfer Object (DTO)
class ProductDTO {
  name: string
  price: number
}

@Controller()
export class AppController {

  // constructor(private readonly appService: AppService) {}

  // GET /
  @Get()
  getHello(): string {
    // return this.appService.getHello()
    return "Hello World!"
  }

  // GET /info
  @Get('info')
  getInfo(): string {
    // return this.appService.getInfo()
    return "This is a test API"
  }

  // GET /search?name=productName&price=100
  @Get('search')
  getSearch(@Query('name') name: string, @Query('price') price: number): string {
    // return this.appService.getSearch()
    return `Search for product: ${name} with price: ${ Number(price) + 10 }`
  }

  // GET /id/pname
  // @Get(':id/:pname') 
  // getProduct(@Param('id') id: string, @Param('pname') pname: string): string {
  //   return `Product ID: ${id} with name: ${pname}`
  // }

  // GET /cat/page?limit=10&offset=0
  // @Get(':cat/:page')
  // getByCategory(
  //   @Param('cat') cat: string, 
  //   @Param('page') page: string, 
  //   @Query('limit') limit: number, 
  //   @Query('offset') offset: number
  // ): string {
  //   return `Category: ${cat} with page: ${page} and limit: ${limit} and offset: ${offset}`
  // }

  // POST /
  @Post()
  @HttpCode(201)
  createProduct(@Body() product: any) {
    return {
      message: 'Product created',
      data: product
    }
  }

  // PUT /id
  @Put(':id')
  updateProduct(
    @Param('id') id: string, 
    @Body() product: any) {
    return {
      message: 'Product updated',
      data: product
    }
  }

  // DELETE /id
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return {
      message: 'Product deleted',
      id: id
    }
  }

}
