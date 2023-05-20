<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Illuminate\Support\Facades\Http;
use jcobhams\NewsApi\NewsApi;
use SimplePie\SimplePie;

class NewsController extends Controller
{
    //get all news
    public function getAllNews(Request $request)
    {
        $news = News::search($request->q)->paginate($request->perPage ?? 10);
        return response()->json([
            'message' => "All news",
            'data' => $news,
            'status' => 200,
        ], 200);
    }

    public function getPreferenceNews(Request $request)
    {

        $news = News::filter()->search($request->q)->paginate($request->perPage ?? 10);
        return response()->json([
            'message' => "All news",
            'data' => $news,
            'status' => 200,
        ], 200);
    }
    public static function storeNewsFromAPI()
    {
        $newsapi = new NewsApi("4dbd255a381c4c05b7e4ce969189340f");
        $category = config('category.category');
        foreach ($category as $value) {
            // data from newsapi
            $newsData = $newsapi->getTopHeadlines(null,  null, "us",  $value['newsapi'], 50, 1);
            foreach ($newsData->articles as $news) {
                //check if title already exist
                $check = News::where('title', $news->title)->first();
                if (!$check) {
                    $data = new News();
                    $data->title = $news->title ?? null;
                    $data->urlToImage = $news->urlToImage ?? null;
                    $data->description = $news->description ?? null;
                    $data->newsUrl = $news->url ?? null;
                    $data->author = $news->author ?? "Others";
                    $data->source = "NewsApi";
                    $data->category = $value['name'];
                    $data->save();
                }
            }

            // data from the guardian
            $feedUrl = 'https://www.theguardian.com/' . $value['guardian'] . '/rss';
            $simplePie = new SimplePie();
            $simplePie->set_feed_url($feedUrl);
            $simplePie->enable_cache(false);
            $simplePie->init();
            $items = $simplePie->get_items();

            foreach ($items as $item) {
                //check if title already exist
                $check = News::where('title', $item->get_title())->first();
                if (!$check) {
                    $data = new News();
                    $data->title = $item->get_title() ?? null;
                    $data->urlToImage = html_entity_decode($item->get_enclosure(0)->get_link()) ?? null;
                    $data->description = $item->get_description() ?? null;
                    $data->newsUrl = $item->get_link() ?? null;
                    $data->author = $item->get_author()->get_name() ?? "Others";
                    $data->source = "The Guardian";
                    $data->category = $value['name'];
                    $data->save();
                }
            }

            // data from the NYT
            $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cNd5Er6QHaeTMj7v2fs12UnDkxHvepG5' . $value['nyt'];
            $items = Http::get($url);
            foreach ($items['response']['docs'] ?? [] as $item) {
                //check if title already exist
                $check = News::where('title', $item['headline']['main'])->first();
                if (!$check) {
                    $data = new News();
                    $data->title = $item['headline']['main'] ?? null;
                    $data->urlToImage = null;
                    $data->description = $item['headline']['main'] ?? null;
                    $data->newsUrl = $item['web_url'] ?? null;
                    $data->author = $item['byline']['person'] ? $item['byline']['person'][0]['firstname'] . ' ' . $item['byline']['person'][0]['lastname'] : "Others";
                    $data->source = "New York Times";
                    $data->category = $value['name'];
                    $data->save();
                }
            }
        }
    }
}
