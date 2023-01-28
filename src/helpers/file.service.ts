import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { FileInterceptor } from '@nestjs/platform-express';
require('dotenv').config();

const credentials = {
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
};

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client(credentials);

  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const params = {
      Bucket: "nyxeetbucket",
      Key: 'cat.jpg', 
      Body: file.buffer
    };
    try {
      const results = await this.s3Client.send(new PutObjectCommand(params));

      return {
        message: "Successfully created " +
          params.Key +
          " and uploaded it to " +
          params.Bucket +
          "/" +
          params.Key, data: { results }
      }; // For unit tests.
    } catch (err) {
      throw new Error("File is not uploaded")
    }
  }

}