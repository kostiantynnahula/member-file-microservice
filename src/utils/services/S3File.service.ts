import * as AWS from 'aws-sdk';

export class S3FileService {
  private s3: AWS.S3;

  constructor() {
    this.s3Config();
  }

  s3Config() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    });
    this.s3 = new AWS.S3();
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3
      .deleteObject({ Bucket: process.env.AWS_S3_BUCKET, Key: key })
      .promise();
  }

  async deleteFiles(keys: string[]): Promise<void> {
    const objects = keys.map((key) => ({ Key: key }));

    await this.s3
      .deleteObjects({
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: {
          Objects: objects,
        },
      })
      .promise();
  }
}
