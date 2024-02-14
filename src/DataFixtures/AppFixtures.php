<?php

namespace App\DataFixtures;

use APP\Entity\Todo;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 20; $i++) {
            $rand = random_int(0, 1000);
            $todo = new Todo();
            $todo->setName('todo'.$rand)
                    ->setDescription('Pov : Je fais un apagnan au centre du village')
                    ->setDone(rand(0,1)>0.5);
            $manager->persist($todo);
        }
        $manager->flush();
    }
}
