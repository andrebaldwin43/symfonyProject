<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class GoogleAPIService
{
    private HttpClientInterface $client;
    private string $apiKey;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
        $this->apiKey = $_ENV['GOOGLE_API_KEY'] ?? '';
    }

    public function getCurrentConditions(string $zipCode, string $countryCode = 'US'): array
    {
        // Step 1: Get coordinates from the Google Geocoding API
        $url ="https://maps.googleapis.com/maps/api/geocode/xml?address={$zipCode},+{$countryCode}&key={$this->apiKey}";

        $result = simplexml_load_file($url);

        // Make sure we have valid results.
        if (empty($result)) {
            return null;
        }

        $location = $result->result->geometry->location;
        $lat = $location->lat->__toString();
        $lng = $location->lng->__toString();

        // Step 2: Query the Google Weather API using coordinates
        $weatherResponse = $this->client->request('GET', 'https://weather.googleapis.com/v1/currentConditions:lookup', [
            'query' => [
                'key' => $this->apiKey,
                'location.latitude' => $lat,
                'location.longitude' => $lng,
                'unitsSystem' => 'IMPERIAL', // Use METRIC or IMPERIAL
            ],
        ]);

        return $weatherResponse->toArray();
    }
}