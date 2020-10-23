module.exports = async function(migration, options) {
  const { createClient } = require("contentful-management");
  const locale = "en-US";

  try {
    const client = createClient({
      accessToken: options.accessToken
    });

    const space = await client.getSpace(options.spaceId);
    const environment = await space.getEnvironment(options.environmentId);

    // Delete all existing work entries.
    const workEntries = await environment.getEntries({
      content_type: "workEntry"
    });

    for (let i = 0; i < workEntries.items.length; i++) {
      const workEntry = workEntries.items[i];
      await (await workEntry.unpublish()).delete();
    }

    // Update all work pages.
    const workPages = await environment.getEntries({
      content_type: "workPage"
    });

    for (let i = 0; i < workPages.items.length; i++) {
      const workPage = workPages.items[i];
      const images = workPage.fields.images[locale];

      console.log(workPage.fields);

      const publishedEntries = [];
      for (let j = 0; j < images.length; j++) {
        const image = images[j];
        let fields = {
          title: {},
          image: {}
        };

        const asset = await environment.getAsset(image.sys.id);
        const title = asset.fields.title[locale];
        console.log(`Migrating ${title}`);

        fields.title[locale] = title;
        fields.image[locale] = image;

        const newWorkEntry = await environment.createEntry("workEntry", {
          fields
        });

        const publishedWorkEntry = await (
          await newWorkEntry.update()
        ).publish();

        publishedEntries.push({
          sys: {
            type: "Link",
            linkType: "Entry",
            id: publishedWorkEntry.sys.id
          }
        });
      }

      workPage.fields.entries = {};
      workPage.fields.entries[locale] = publishedEntries;
      await (await workPage.update()).publish();
    }
  } catch (e) {
    console.log("Something went wrong!");
    console.log(e);
    process.exit(1);
  }
};
