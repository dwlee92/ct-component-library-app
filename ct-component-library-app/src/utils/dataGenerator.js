import jsf from "json-schema-faker";
import faker from "faker";
import Chance from "chance";

jsf.extend("faker", () => faker);
jsf.extend("chance", () => new Chance());

const refs = [
  {
    id: "commentDataSchema",
    type: "object",
    properties: {
      id: {
        type: "string",
        chance: "guid",
      },
      commentText: {
        type: "string",
        faker: "hacker.phrase",
      },
      thumbsUp: {
        type: "integer",
        minimum: 0,
        maximum: 100,
      },
      datePosted: {
        type: "string",
        format: "datetime",
      },
      dateEdited: {
        type: "string",
        format: "datetime",
      },
      isEdited: {
        type: "boolean",
      },
      isDeleted: {
        type: "boolean",
        enum: [false],
      },
      user: {
        $ref: "userDataSchema",
      },
    },
    required: [
      "id",
      "commentText",
      "thumbsUp",
      "datePosted",
      "dateEdited",
      "isEdited",
      "isDeleted",
      "user",
    ],
  },
  {
    id: "userDataSchema",
    type: "object",
    properties: {
      id: {
        type: "string",
        chance: "guid",
      },
      userName: {
        type: "string",
        faker: "internet.userName",
      },
      avatar: {
        type: "string",
        faker: "internet.avatar",
      },
      email: {
        type: "string",
        faker: "internet.exampleEmail",
      },
      bio: {
        type: "string",
        faker: "lorem.paragraphs",
      },
    },
    required: ["id", "userName", "avatar", "email", "bio"],
  },
  {
    id: "postDataSchema",
    type: "object",
    properties: {
      id: {
        type: "string",
        chance: "guid",
      },
      title: {
        type: "string",
        faker: "company.bs",
      },
      postText: {
        type: "string",
        faker: "lorem.paragraphs",
      },
      datePosted: {
        type: "string",
        format: "datetime",
      },
      dateEdited: {
        type: "string",
        format: "datetime",
      },
      thumbsUp: {
        type: "integer",
        minimum: 0,
        maximum: 100,
      },
      isEdited: {
        type: "boolean",
      },
      isDeleted: {
        type: "boolean",
        enum: [false],
      },
      comments: {
        type: "array",
        minItems: 2,
        maxItems: 5,
        items: {
          $ref: "commentDataSchema",
        },
      },
      user: {
        $ref: "userDataSchema",
      },
    },
    required: [
      "id",
      "title",
      "postText",
      "postUrl",
      "postImage",
      "datePosted",
      "dateEdited",
      "thumbsUp",
      "isEdited",
      "isDeleted",
      "comments",
      "user",
    ],
  },
];

const frontPageSchema = {
  type: "object",
  properties: {
    posts: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        postData: {
          $ref: "postDataSchema",
        },
      },
    },
    userData: {
      $ref: "userDataSchema",
    },
  },
  required: ["posts", "userData"],
};

const userPageSchema = {
  type: "object",
  properties: {
    userData: {
      $ref: "userDataSchema",
    },
  },
  required: ["posts", "comments", "userData"],
};

export const frontPageData = jsf.generate(frontPageSchema, refs);
export const userPageData = jsf.generate(userPageSchema, refs);
