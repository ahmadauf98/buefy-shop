const puppeteer = require("puppeteer-extra");
const admin = require("firebase-admin");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const db = admin.firestore();

module.exports.run_trackingmore = async () => {
  await puppeteer
    .launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    })

    .then(async (browser) => {
      //opening a new page and navigating to trackingmore
      const page = await browser.newPage();

      //turns request interceptor on
      await page.setRequestInterception(true);

      //if the page makes a  request to a resource type of image or stylesheet then abort that request
      page.on("request", (request) => {
        if (
          request.resourceType() === "image" ||
          request.resourceType() === "stylesheet"
        )
          request.abort();
        else request.continue();
      });

      // scrapping data from ABX review page
      await page.goto(
        "https://www.trackingmore.com/review-abxexpress-my.html?lang=en&p=1"
      );

      await page.waitForSelector("body");

      //manipulating the page's content
      let grabPosts = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll(".review");
        let overall_rating = document.body.querySelector(".average").innerText;
        let courier_img = document.body.querySelector(".company-screenshot")
          .src;
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach((item) => {
          let post_name = item.querySelector(".user-review-name").innerText;
          let post_title = item.querySelector(".review-title-link").innerText;
          let post_date = item.querySelector(".ndate").innerText;
          let post_feedback = "";
          try {
            post_feedback = item
              .querySelector(".review-body")
              .innerText.replace("Reply", "")
              .replace("\n", "");
          } catch (err) {}
          scrapeItems.push({
            post_name: post_name,
            post_title: post_title,
            post_feedback: post_feedback,
            post_date: post_date,
          });
        });
        let items = {
          brand_name: "ABX Express",
          courier_id: "abx_express",
          courier_img: courier_img,
          overall_rating: overall_rating,
          courier_feedback: scrapeItems,
        };
        return items;
      });

      //store at firebase
      await db
        .collection("courier")
        .doc("abx_express")
        .set(grabPosts, { merge: true });

      //outputting the scraped data
      console.log("Success. abx courier dataset has been push to firestore.");

      // scrapping data from CITYLINK review page
      await page.goto(
        "https://www.trackingmore.com/review-citylinkexpress.html"
      );

      await page.waitForSelector("body");

      //manipulating the page's content
      let grabPosts1 = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll(".review");
        let overall_rating = document.body.querySelector(".average").innerText;
        let courier_img = document.body.querySelector(".company-screenshot")
          .src;
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach((item) => {
          let post_name = item.querySelector(".user-review-name").innerText;
          let post_title = item.querySelector(".review-title-link").innerText;
          let post_date = item.querySelector(".ndate").innerText;
          let post_feedback = "";
          try {
            post_feedback = item
              .querySelector(".review-body")
              .innerText.replace("Reply", "")
              .replace("\n", "");
          } catch (err) {}
          scrapeItems.push({
            post_name: post_name,
            post_title: post_title,
            post_feedback: post_feedback,
            post_date: post_date,
          });
        });
        let items = {
          brand_name: "City-Link Express",
          courier_id: "citylink_express",
          courier_img: courier_img,
          overall_rating: overall_rating,
          courier_feedback: scrapeItems,
        };
        return items;
      });

      //store at firebase
      await db
        .collection("courier")
        .doc("citylink_express")
        .set(grabPosts1, { merge: true });

      //outputting the scraped data
      console.log(
        "Success. citylink courier dataset has been push to firestore."
      );

      // scrapping data from GDEX review page
      await page.goto("https://www.trackingmore.com/review-gdex.html");

      await page.waitForSelector("body");

      //manipulating the page's content
      let grabPosts2 = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll(".review");
        let overall_rating = document.body.querySelector(".average").innerText;
        let courier_img = document.body.querySelector(".company-screenshot")
          .src;
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach((item) => {
          let post_name = item.querySelector(".user-review-name").innerText;
          let post_title = item.querySelector(".review-title-link").innerText;
          let post_date = item.querySelector(".ndate").innerText;
          let post_feedback = "";
          try {
            post_feedback = item
              .querySelector(".review-body")
              .innerText.replace("Reply", "")
              .replace("\n", "");
          } catch (err) {}
          scrapeItems.push({
            post_name: post_name,
            post_title: post_title,
            post_feedback: post_feedback,
            post_date: post_date,
          });
        });
        let items = {
          brand_name: "GDex",
          courier_id: "gd_express",
          courier_img: courier_img,
          overall_rating: overall_rating,
          courier_feedback: scrapeItems,
        };
        return items;
      });

      //store at firebase
      await db
        .collection("courier")
        .doc("gd_express")
        .set(grabPosts2, { merge: true });

      //outputting the scraped data
      console.log("Success. gdex courier dataset has been push to firestore.");

      // scrapping data from NINJAVAN review page
      await page.goto("https://www.trackingmore.com/review-ninjavan-my.html");

      await page.waitForSelector("body");

      //manipulating the page's content
      let grabPosts3 = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll(".review");
        let overall_rating = document.body.querySelector(".average").innerText;
        let courier_img = document.body.querySelector(".company-screenshot")
          .src;
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach((item) => {
          let post_name = item.querySelector(".user-review-name").innerText;
          let post_title = item.querySelector(".review-title-link").innerText;
          let post_date = item.querySelector(".ndate").innerText;
          let post_feedback = "";
          try {
            post_feedback = item
              .querySelector(".review-body")
              .innerText.replace("Reply", "")
              .replace("\n", "");
          } catch (err) {}
          scrapeItems.push({
            post_name: post_name,
            post_title: post_title,
            post_feedback: post_feedback,
            post_date: post_date,
          });
        });
        let items = {
          brand_name: "Ninja Van",
          courier_id: "ninja_van",
          courier_img: courier_img,
          overall_rating: overall_rating,
          courier_feedback: scrapeItems,
        };
        return items;
      });

      //store at firebase
      await db
        .collection("courier")
        .doc("ninja_van")
        .set(grabPosts3, { merge: true });

      //outputting the scraped data
      console.log(
        "Success. ninjavan courier dataset has been push to firestore."
      );

      //scrapping data from POSLAJU review page
      await page.goto("https://www.trackingmore.com/review-poslaju.html");

      await page.waitForSelector("body");

      //manipulating the page's content
      let grabPosts4 = await page.evaluate(() => {
        let allPosts = document.body.querySelectorAll(".review");
        let overall_rating = document.body.querySelector(".average").innerText;
        let courier_img = document.body.querySelector(".company-screenshot")
          .src;
        //storing the post items in an array then selecting for retrieving content
        scrapeItems = [];
        allPosts.forEach((item) => {
          let post_name = item.querySelector(".user-review-name").innerText;
          let post_title = item.querySelector(".review-title-link").innerText;
          let post_date = item.querySelector(".ndate").innerText;
          let post_feedback = "";
          try {
            post_feedback = item
              .querySelector(".review-body")
              .innerText.replace("Reply", "")
              .replace("\n", "");
          } catch (err) {}
          scrapeItems.push({
            post_name: post_name,
            post_title: post_title,
            post_feedback: post_feedback,
            post_date: post_date,
          });
        });
        let items = {
          brand_name: "Pos Laju",
          courier_id: "pos_laju",
          courier_img: courier_img,
          overall_rating: overall_rating,
          courier_feedback: scrapeItems,
        };
        return items;
      });

      //store at firebase
      await db
        .collection("courier")
        .doc("pos_laju")
        .set(grabPosts4, { merge: true });

      //outputting the scraped data
      console.log(
        "Success. poslaju courier dataset has been push to firestore."
      );

      //closing the browser
      await browser.close();
    })
    //handling any errors
    .catch(function (err) {
      console.error(err.message);
    });
};

module.exports.run_trackingmore();
