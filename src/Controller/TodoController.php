<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\DoneType;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/todo')]
class TodoController extends AbstractController
{
    #[Route('/', name: 'app_todo_index', methods: ['GET', 'POST'])]
    public function index(TodoRepository $todoRepository, Request $request): Response
    {
        $orderby = $request->query->get('orderby')??'id';
        $order = $request->query->get('order')??'ASC';
        $filterform = $this->createForm(DoneType::class);
        $filterform->handleRequest($request);
        $criteria = [];

       if ($filterform->isSubmitted() && $filterform->isValid()) {

            $stillTodo = $filterform->get('todo')->getData();
            if ($stillTodo) {
                $criteria = [
                    'isDone' => false,
                ];
            }
            
        }         

        
        //$todos = $todoRepository->findBy($criteria);

        if($order == 'ASC'){
            return $this->render('todo/index.html.twig', [
                'todos' => $todoRepository->findAllOrdered($order, $orderby, $criteria),
                // 'todos' => $todos,
                'order' => 'DESC',
                'form' => $filterform->createView(),
            ]);
         } else{ 
            return $this->render('todo/index.html.twig', [
                'todos' => $todoRepository->findAllOrdered($order, $orderby, $criteria),
                //'todos' => $todos,
                'order' => 'ASC',
                'form' => $filterform->createView(),
            ]);
        }
    }

    #[Route('/new', name: 'app_todo_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $todo = new Todo();
        $form = $this->createForm(TodoType::class, $todo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($todo);
            $entityManager->flush();

            return $this->redirectToRoute('app_todo_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('todo/new.html.twig', [
            'todo' => $todo,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_todo_show', methods: ['GET'])]
    public function show(Todo $todo): Response
    {
        return $this->render('todo/show.html.twig', [
            'todo' => $todo,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_todo_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Todo $todo, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TodoType::class, $todo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_todo_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('todo/edit.html.twig', [
            'todo' => $todo,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_todo_delete', methods: ['POST'])]
    public function delete(Request $request, Todo $todo, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$todo->getId(), $request->request->get('_token'))) {
            $entityManager->remove($todo);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_todo_index', [], Response::HTTP_SEE_OTHER);
    }
}
