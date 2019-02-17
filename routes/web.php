<?php

$this->get('subscription/{id}/{code}/{subscribed}', 'Api\SubscriptionController@update')->name('subscription');

$this->get('{uri?}', 'AppController@app')->where(['uri' => '^(?!api).*$'])->name('app');
