import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async insertItem(item: Item) {
    console.log(item)
    const newItem = new this.itemModel(item);
    console.log(newItem)
    const result = await newItem.save();
    return result.id as string;
  }

  async getItems() {
    const items = await this.itemModel.find().exec();
    return items.map(item => ({
      id: item._id,
      title: item.name,
      description: item.description,
      amount: item.amount,
    }));
  }

  async getSingleItem(itemId: string) {
    const item = await this.findItem(itemId);
    return {
      id: item._id,
      title: item.name,
      description: item.description,
      amount: item.amount,
    };
  }

  async updateProduct(
    itemId: string,
    item: Item
  ) {
    const updatedItem = await this.findItem(itemId);
    const {name, description, amount} = item;
    if (name) {
      updatedItem.name = name;
    }
    if (description) {
      updatedItem.description = description;
    }
    if (amount) {
      updatedItem.amount = amount;
    }
    updatedItem.save();
  }

  async deleteProduct(itemId: string) {
    const result = await this.itemModel.deleteOne({_id: itemId}).exec();
    console.log(result)
    return result
  }

  private async findItem(id: string): Promise<ItemDocument> {
    let item;
    try {
      item = await this.itemModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!item) {
      throw new NotFoundException('Could not find product.');
    }
    return item;
  }
}
