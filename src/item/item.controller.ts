import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';

  import { Item } from './item.schema';
  
import { ItemService } from './item.services';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async addItem(
    @Body() body: Item,
  ) {
    console.log(body)
    const generatedId = await this.itemService.insertItem(body);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const items = await this.itemService.getItems();
    return items;
  }

  @Get(':id')
  getProduct(@Param('id') itemId: string) {
    return this.itemService.getSingleItem(itemId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() item: Item
  ) {
    await this.itemService.updateProduct(prodId, item);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
      await this.itemService.deleteProduct(prodId);
      return null;
  }
}