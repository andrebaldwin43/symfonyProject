<?php

namespace App\Controller;

use App\Service\GoogleAPIService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractController
{
    #[Route('/' , name: 'dashboard')]
    public function index(): Response
    {
        return $this->render('dashboard.html.twig', []);
    }

    #[Route('/weather', name: 'app_weather_api')]
    public function weatherAPI(GoogleAPIService $weatherService): JsonResponse
    {
        try {
            $data = $weatherService->getCurrentConditions('48186');
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}