<?php

$this->get('{uri?}', 'AppController@app')->where(['uri' => '^(?!api).*$'])->name('app');
