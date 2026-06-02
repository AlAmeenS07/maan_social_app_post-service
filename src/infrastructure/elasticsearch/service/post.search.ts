import { esClient } from "../../../config/elastic.search";

export type SearchPostsParams = {
  search?: string;
  status?: "listed" | "unlisted";
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
};

export const searchPostsElasticsearch = async ({
  search = "",
  status,
  from,
  to,
  page = 1,
  limit = 10,
}: SearchPostsParams) => {

  const must: any[] = [];
  const filter: any[] = [];

  // Search
  if (search.trim()) {
    must.push({
      multi_match: {
        query: search,
        type: "bool_prefix",
        fields: [
          "content",
          "content._2gram",
          "content._3gram",
        ],
      },
    });
  }

  // Listing Status
  if (status === "listed") {
    filter.push({
      term: {
        isListed: true,
      },
    });
  }

  if (status === "unlisted") {
    filter.push({
      term: {
        isListed: false,
      },
    });
  }

  // Date Range
  if (from || to) {

    const range: Record<string, Date> = {};

    if (from) {
      range.gte = from;
    }

    if (to) {
      range.lte = to;
    }

    filter.push({
      range: {
        createdAt: range,
      },
    });
  }

  const skip = (page - 1) * limit;

  const result = await esClient.search({
    index: "posts",

    from: skip,

    size: limit,

    query: {
      bool: {
        must,
        filter,
      },
    },

    sort: [
      {
        createdAt: {
          order: "desc",
        },
      },
    ],
  });

  const posts = result.hits.hits.map(
    (hit: any) => hit._source
  );

  const total =
    typeof result.hits.total === "number"
      ? result.hits.total
      : result.hits.total?.value || 0;

  return {
    posts,
    total,
    totalPages: Math.ceil(total / limit),
  };
};