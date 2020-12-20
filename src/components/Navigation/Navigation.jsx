import React from 'react';
import s from './Navigation.module.scss';

const Navigation = () => {
  return (
    <div className={s.navigation}>
      <section className={s.section}>
        <p className={s.sectionName}>Данные</p>
        <a href="#" className={s.item + ' ' + s.active}>
          <i className="bi bi-upload"></i>
          <span>Исходные данные</span>
        </a>
        <a href="#" className={s.item}>
          <i class="bi bi-graph-up"></i>
          <span>Обзор данных</span>
        </a>
      </section>
      <section className={s.section}>
        <p className={s.sectionName}>Расчеты</p>
        <a href="#" className={s.item}>
          <i class="bi bi-gear"></i>
          <span>Параметры</span>
        </a>
        <a href="#" className={s.item}>
          <i class="bi bi-arrow-down"></i>
          <span>Оценка риска</span>
        </a>
        <a href="#" className={s.item}>
          <i class="bi bi-arrow-up"></i>
          <span>Оценка доходности</span>
        </a>
        <a href="#" className={s.item}>
          <i class="bi bi-check2"></i>
          <span>Выбор лучшего ПИФа</span>
        </a>
      </section>
    </div>
  );
};

export default Navigation;
