<?php

namespace App\Controller;

use App\Service\GoogleAPIService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractController
{
    #[Route('/' , name: 'dashboard')]
    public function index(): Response
    {
        return $this->render('dashboard.html.twig', []);
    }

    #[Route('/api/weather', name: 'app_weather_api')]
    public function weatherAPI(Request $request, GoogleAPIService $weatherService): JsonResponse
    {
        $data = $request->toArray();
        $zipcode = $data['inputValue'] ?? null;

        try {
            $data = $weatherService->getCurrentConditions($zipcode);
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}